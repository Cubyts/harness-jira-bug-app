const REQUIRED_FIELDS = ['name', 'owner', 'environment'];

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function fetchAgents(seedAgents) {
  // BUG: Front end adds an unnecessary delay before rendering the agent list,
  // making the list page feel slow even though the mocked API has data already.
  await wait(2800);
  return seedAgents;
}

export async function createAgent(formValues, existingAgents) {
  await wait(300);

  const missingField = REQUIRED_FIELDS.find((field) => !formValues[field]);

  if (missingField) {
    throw new Error(`Save failed: ${missingField} is required.`);
  }

  // BUG: Backend mock does not reject duplicate agent names.
  // Frontend also does not check existingAgents before calling this API.
  return {
    id: `agent-${Date.now()}`,
    name: formValues.name,
    owner: formValues.owner,
    status: formValues.status || 'Offline',
    environment: formValues.environment,
    description: formValues.description
  };
}

export async function deleteAgent(agentId) {
  await wait(250);

  // BUG: Delete endpoint throws for every row, so deleting an agent leaves
  // the dashboard in an error state.
  throw new Error(`Unable to delete ${agentId}. Please try again later.`);
}
