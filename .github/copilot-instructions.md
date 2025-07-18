# Copilot Instructions for BiteSpeed Frontend Task

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React JavaScript project for building a chatbot flow builder using React Flow.

## Project Guidelines

- Use JavaScript (not TypeScript) for all components
- Use React Flow for the flow builder interface
- Follow extensible architecture patterns to easily add new node types
- Add detailed comments to explain code functionality
- Use modern React patterns (hooks, functional components)
- Ensure proper state management for flow data

## Key Components

- **Text Node**: Draggable node component for text messages
- **Nodes Panel**: Extensible panel for different node types
- **Settings Panel**: Dynamic panel for editing selected nodes
- **Flow Builder**: Main component integrating React Flow
- **Save functionality**: Validation and save logic for flows

## Validation Rules

- Source handles can only have one outgoing edge
- Target handles can have multiple incoming edges
- Save validation: Error if more than one node has empty target handles when there are multiple nodes
