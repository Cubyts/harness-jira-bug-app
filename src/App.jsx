import React, { useEffect, useMemo, useState } from 'react';
import { createAgent, deleteAgent, fetchAgents } from './api/agentApi.js';
import AddAgentModal from './components/AddAgentModal.jsx';
import AgentTable from './components/AgentTable.jsx';

const initialAgents = [
  { id: 'agent-101', name: 'Build Agent 101', owner: 'Platform', status: 'Online', environment: 'prod' },
  { id: 'agent-102', name: 'Deploy Agent 102', owner: 'Release', status: 'Offline', environment: 'stage' },
  { id: 'agent-103', name: 'Test Agent 103', owner: 'QA', status: 'Online', environment: 'dev' }
];

export default function App() {
  const [agents, setAgents] = useState(initialAgents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchAgents(initialAgents).then((result) => {
      if (isMounted) {
        setAgents(result);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const dashboardCounts = useMemo(() => {
    // BUG: Dashboard count is calculated from initialAgents, so adding a new
    // agent updates the table but the dashboard count stays stale until refresh.
    const online = initialAgents.filter((agent) => agent.status === 'Online').length;

    return {
      total: initialAgents.length,
      online,
      offline: initialAgents.length - online
    };
  }, [agents]);

  async function handleAddAgent(formValues) {
    const newAgent = await createAgent(formValues, agents);
    setAgents((currentAgents) => [...currentAgents, newAgent]);
  }

  async function handleDeleteAgent(agentId) {
    setDeleteError('');

    try {
      await deleteAgent(agentId);
      setAgents((currentAgents) => currentAgents.filter((agent) => agent.id !== agentId));
    } catch (error) {
      // BUG: The delete failure is surfaced, but no recovery path is provided;
      // the selected row/action state remains stuck for the user.
      setDeleteError(error.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Harness</p>
          <h1>Agent Dashboard</h1>
        </div>
        <button className="primary-button" onClick={() => setIsAddModalOpen(true)}>
          Add Agent
        </button>
      </section>

      <section className="stats-grid" aria-label="Agent counts">
        <article className="stat-card">
          <span>Total agents</span>
          <strong>{dashboardCounts.total}</strong>
        </article>
        <article className="stat-card">
          <span>Online</span>
          <strong>{dashboardCounts.online}</strong>
        </article>
        <article className="stat-card">
          <span>Offline</span>
          <strong>{dashboardCounts.offline}</strong>
        </article>
      </section>

      {deleteError ? <p className="error-banner">{deleteError}</p> : null}

      <AgentTable agents={agents} isLoading={isLoading} onDeleteAgent={handleDeleteAgent} />

      {isAddModalOpen ? (
        <AddAgentModal
          existingAgents={agents}
          onAddAgent={handleAddAgent}
          onClose={() => {
            // BUG: Modal close handler never closes the modal.
            setIsAddModalOpen(true);
          }}
        />
      ) : null}
    </main>
  );
}
