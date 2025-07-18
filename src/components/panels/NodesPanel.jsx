import React from 'react';
import './NodesPanel.css';

/**
 * NodesPanel component displays available node types that can be added to the flow
 * Features:
 * - Extensible design to easily add new node types in the future
 * - Currently supports Text Message nodes
 * - Drag and drop functionality (implemented via click for simplicity)
 */
const NodesPanel = ({ onAddTextNode }) => {
  // Array of available node types - easily extensible for future node types
  const nodeTypes = [
    {
      id: 'text-message',
      label: 'Message',
      icon: '💬',
      description: 'Send a text message',
      onAdd: onAddTextNode,
    },
    // Future node types can be added here:
    // {
    //   id: 'condition',
    //   label: 'Condition',
    //   icon: '🔀',
    //   description: 'Add conditional logic',
    //   onAdd: onAddConditionNode,
    // },
    // {
    //   id: 'delay',
    //   label: 'Delay',
    //   icon: '⏱️',
    //   description: 'Add a delay',
    //   onAdd: onAddDelayNode,
    // },
  ];

  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes</h3>
        <p>Drag and drop nodes to add them to your flow</p>
      </div>
      
      <div className="nodes-list">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.id}
            className="node-item"
            onClick={nodeType.onAdd}
            draggable
            onDragStart={(e) => {
              // Enable drag and drop functionality
              e.dataTransfer.setData('application/reactflow', nodeType.id);
              e.dataTransfer.effectAllowed = 'move';
            }}
          >
            <div className="node-item-icon">{nodeType.icon}</div>
            <div className="node-item-content">
              <div className="node-item-label">{nodeType.label}</div>
              <div className="node-item-description">{nodeType.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="panel-footer">
        <p className="help-text">
          Click on a node to add it to the flow, or drag it to a specific position.
        </p>
      </div>
    </div>
  );
};

export default NodesPanel;
