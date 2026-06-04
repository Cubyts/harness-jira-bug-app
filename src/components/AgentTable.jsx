import React from 'react';

export default function AgentTable({ agents, isLoading, onDeleteAgent }) {
  if (isLoading) {
    return <p className="loading-message">Loading agents...</p>;
  }

  return (
    <section className="table-panel">
      <h2 className="table-title">Agent list</h2>
      <table className="agent-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Status</th>
            <th>Environment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>{agent.name}</td>
              <td>{agent.owner}</td>
              <td>{agent.description}</td>
              <td>{agent.status}</td>
              <td>{agent.environment}</td>
              <td>
                <button className="danger-button" onClick={() => onDeleteAgent(agent.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
