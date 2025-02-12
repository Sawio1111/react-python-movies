import { toast } from "react-toastify";

export const AddActor = async (actor, actors, setActors) => {
    const response = await fetch('/actors', {
        method: 'POST',
        body: JSON.stringify(actor),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const newActor = await response.json();
        setActors([...actors, newActor]);
        toast.success('Actor added successfully');
    } else {
        toast.error('Failed to add actor');
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
        toast.error('Failed to fetch actors');
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
        toast.success('Actor deleted successfully');
    } else {
        toast.error('Failed to delete actor');
    }
};