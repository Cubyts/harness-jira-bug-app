import React, { useState } from 'react';

const emptyForm = {
  name: '',
  owner: '',
  status: 'Offline'
};

export default function AddAgentModal({ existingAgents, onAddAgent, onClose }) {
  const [formValues, setFormValues] = useState(emptyForm);
  const [saveError, setSaveError] = useState('');

  function updateField(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaveError('');

    // BUG: No mandatory field validation is shown before save. The modal also
    // does not include the required environment field, so the API rejects save.
    // BUG: No duplicate check happens here before adding an agent.
    const duplicateAgent = existingAgents.find((agent) => agent.name === formValues.name);
    console.info('Duplicate check placeholder:', duplicateAgent);

    try {
      await onAddAgent(formValues);
      onClose();
    } catch (error) {
      setSaveError(error.message);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-agent-title">
        <header className="modal-header">
          <h2 id="add-agent-title">Add agent</h2>
          <button className="icon-button" aria-label="Close add agent modal" onClick={onClose}>
            x
          </button>
        </header>

        <form className="agent-form" onSubmit={handleSubmit}>
          <label>
            Agent name
            <input
              value={formValues.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Build Agent 104"
            />
          </label>

          <label>
            Owner
            <input
              value={formValues.owner}
              onChange={(event) => updateField('owner', event.target.value)}
              placeholder="Platform"
            />
          </label>

          <label>
            Status
            <select value={formValues.status} onChange={(event) => updateField('status', event.target.value)}>
              <option>Online</option>
              <option>Offline</option>
            </select>
          </label>

          {saveError ? <p className="form-error">{saveError}</p> : null}

          <footer className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
