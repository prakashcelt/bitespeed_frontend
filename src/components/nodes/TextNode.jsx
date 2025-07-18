import React from 'react';
import { Handle, Position } from 'reactflow';
import './TextNode.css';

/**
 * TextNode component represents a text message node in the chatbot flow
 * Features:
 * - Displays text content
 * - Has one source handle (right) for outgoing connections
 * - Has one target handle (left) for incoming connections
 * - Source handle can only have one outgoing edge
 * - Target handle can have multiple incoming edges
 */
const TextNode = ({ data, selected }) => {
  return (
    <div className={`text-node ${selected ? 'selected' : ''}`}>
      {/* Target handle - can receive multiple incoming edges */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="handle target-handle"
      />
      
      {/* Node header */}
      <div className="node-header">
        <div className="node-icon">💬</div>
        <div className="node-label">Send Message</div>
      </div>
      
      {/* Node content - displays the text message */}
      <div className="node-content">
        <div className="message-text">
          {data.text || 'Click to edit message'}
        </div>
      </div>
      
      {/* Source handle - can only have one outgoing edge */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="handle source-handle"
      />
    </div>
  );
};

export default TextNode;
