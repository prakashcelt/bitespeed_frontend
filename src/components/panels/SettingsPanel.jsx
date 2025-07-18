import React, { useState, useEffect } from 'react';
import './SettingsPanel.css';

/**
 * SettingsPanel component allows editing properties of selected nodes
 * Features:
 * - Displays when a node is selected
 * - Provides text editing for Text Message nodes
 * - Extensible design for future node types with different settings
 * - Back button to return to Nodes Panel
 */
const SettingsPanel = ({ selectedNode, onTextChange, onClose }) => {
  const [text, setText] = useState('');

  // Update local text state when selected node changes
  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  // Handle text input changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  // Render different settings based on node type
  const renderNodeSettings = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'textNode':
        return (
          <div className="settings-section">
            <label htmlFor="message-text" className="settings-label">
              Text Message:
            </label>
            <textarea
              id="message-text"
              className="text-input"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your message here..."
              rows={4}
            />
            <div className="input-help">
              This message will be sent to the user when this node is reached.
            </div>
          </div>
        );
      
      // Future node types can add their settings here:
      // case 'conditionNode':
      //   return <ConditionSettings node={selectedNode} />;
      // case 'delayNode':
      //   return <DelaySettings node={selectedNode} />;
      
      default:
        return (
          <div className="settings-section">
            <p>No settings available for this node type.</p>
          </div>
        );
    }
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <button className="back-button" onClick={onClose}>
          ← Back
        </button>
        <h3>Node Settings</h3>
      </div>
      
      <div className="settings-content">
        {selectedNode && (
          <>
            <div className="node-info">
              <div className="node-type">
                <span className="node-icon">
                  {selectedNode.type === 'textNode' ? '💬' : '📝'}
                </span>
                <span className="node-type-label">
                  {selectedNode.type === 'textNode' ? 'Text Message' : 'Unknown'}
                </span>
              </div>
              <div className="node-id">ID: {selectedNode.id}</div>
            </div>
            
            {renderNodeSettings()}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
