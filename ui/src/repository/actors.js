export const AddActor = async (actor, actors, setActors) => {
    const response = await fetch('/actors', {
        method: 'POST',
        body: JSON.stringify(actor),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const newActor = await response.json();
        console.log(newActor)
        setActors([...actors, newActor]);
    } else {
        alert('Failed to add actor');
    }
};

export const GetActors = async (setActors) => {
    const response = await fetch('/actors', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const allActors = await response.json();
        setActors(allActors);
    } else {
        alert('Failed to fetch actors');
    }
};

export const DeleteActor = async (id, actors, setActors) => {
    if (!actors) return;
    const response = await fetch(`/actors/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const deleteActor = await response.json();
        setActors(actors.filter(actor => actor.id !== deleteActor.id));
    } else {
        alert('Failed to delete actor');
    }
};