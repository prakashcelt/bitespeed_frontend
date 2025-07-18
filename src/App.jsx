import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from './components/nodes/TextNode';
import NodesPanel from './components/panels/NodesPanel';
import SettingsPanel from './components/panels/SettingsPanel';
import './App.css';

// Define custom node types - extensible for future node types
const nodeTypes = {
  textNode: TextNode,
};

// Initial nodes and edges
const initialNodes = [];
const initialEdges = [];

function App() {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Application state
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Counter for unique node IDs
  const nodeIdRef = useRef(1);

  // Handle edge connections with source handle validation
  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has an edge (only one edge per source)
      const existingEdge = edges.find(
        (edge) => edge.sourceHandle === params.sourceHandle && edge.source === params.source
      );
      
      if (existingEdge) {
        // Remove existing edge before adding new one
        const newEdges = edges.filter(
          (edge) => !(edge.sourceHandle === params.sourceHandle && edge.source === params.source)
        );
        setEdges([...newEdges, params]);
      } else {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowSettings(true);
  }, []);

  // Handle clicking on empty space to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowSettings(false);
  }, []);

  // Handle drag over event to allow dropping
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop event to add new node at specific position
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the bounding rect of the ReactFlow wrapper
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      
      // Calculate the position relative to the ReactFlow canvas
      const position = {
        x: event.clientX - reactFlowBounds.left - 110, // Offset to center the node
        y: event.clientY - reactFlowBounds.top - 40,   // Offset to center the node
      };

      const newNode = {
        id: `node-${nodeIdRef.current}`,
        type: 'textNode',
        position,
        data: { 
          text: `Text Message ${nodeIdRef.current}`,
          onTextChange: (newText) => updateNodeText(`node-${nodeIdRef.current}`, newText)
        },
      };

      nodeIdRef.current += 1;
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  // Add new text node from nodes panel (fallback for click)
  const addTextNode = useCallback(() => {
    const newNode = {
      id: `node-${nodeIdRef.current}`,
      type: 'textNode',
      position: { x: 250, y: 100 + (nodeIdRef.current - 1) * 150 },
      data: { 
        text: `Text Message ${nodeIdRef.current}`,
        onTextChange: (newText) => updateNodeText(`node-${nodeIdRef.current}`, newText)
      },
    };
    
    nodeIdRef.current += 1;
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Update text of a specific node
  const updateNodeText = useCallback((nodeId, newText) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, text: newText } }
          : node
      )
    );
  }, [setNodes]);

  // Validate and save the flow
  const saveFlow = useCallback(() => {
    if (nodes.length === 0) {
      showNotification('Please add at least one node to save the flow.', 'warning');
      return;
    }

    if (nodes.length === 1) {
      showNotification('Flow saved successfully! 🎉', 'success');
      return;
    }

    // Find nodes with empty target handles (no incoming edges)
    const nodesWithoutTargets = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    // Show error if more than one node has empty target handles
    if (nodesWithoutTargets.length > 1) {
      showNotification(
        `❌ Cannot save flow! ${nodesWithoutTargets.length} nodes have empty target handles. Only one node can be the starting point.`,
        'error'
      );
      return;
    }

    showNotification('Flow saved successfully! 🎉', 'success');
  }, [nodes, edges]);

  // Show notification function
  const showNotification = useCallback((message, type) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <h1>BiteSpeed Chatbot Flow Builder</h1>
        <button className="save-button" onClick={saveFlow}>
          Save Changes
        </button>
      </div>
      
      <div className="app-content">
        {/* Main flow builder area */}
        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid={true}
            snapGrid={[15, 15]}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Side panel - switches between Nodes Panel and Settings Panel */}
        <div className="side-panel">
          {showSettings && selectedNode ? (
            <SettingsPanel 
              selectedNode={selectedNode}
              onTextChange={(newText) => updateNodeText(selectedNode.id, newText)}
              onClose={() => {
                setShowSettings(false);
                setSelectedNode(null);
              }}
            />
          ) : (
            <NodesPanel onAddTextNode={addTextNode} />
          )}
        </div>
      </div>
    </div>
  );
}

// Wrap the App with ReactFlowProvider to enable React Flow context
function AppWrapper() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default AppWrapper;
