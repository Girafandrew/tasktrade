import React, { Component } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";

class Tasks extends Component {
    state = {
        tasks: [],
        currentTask: ""
    };

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            console.log("Data received:", data); // Verifica o formato dos dados recebidos
            this.setState({ tasks: data });
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { currentTask, tasks } = this.state;
        try {
            const { data } = await addTask({ task: currentTask });
            this.setState({ tasks: [...tasks, data], currentTask: "" });
        } catch (error) {
            console.log("Error adding task:", error);
        }
    };

    handleUpdate = async (currentTaskId) => {
        const { tasks } = this.state;
        const updatedTasks = tasks.map(task => {
            if (task._id === currentTaskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        this.setState({ tasks: updatedTasks });

        try {
            await updateTask(currentTaskId, { completed: !tasks.completed });
        } catch (error) {
            console.log("Error updating task:", error);
            this.setState({ tasks });
        }
    };

    handleDelete = async (currentTaskId) => {
        const { tasks } = this.state;
        const filteredTasks = tasks.filter(task => task._id !== currentTaskId);

        this.setState({ tasks: filteredTasks });

        try {
            await deleteTask(currentTaskId);
        } catch (error) {
            console.log("Error deleting task:", error);
            this.setState({ tasks });
        }
    };

    render() {
        const { tasks, currentTask } = this.state;

        // Verifica se tasks é um array antes de chamar .map()
        if (!Array.isArray(tasks)) {
            return <div>No tasks found.</div>;
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={currentTask}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Add Task</button>
                </form>

                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            {task.name}
                            <button onClick={() => this.handleUpdate(task._id)}>
                                {task.completed ? "Undo" : "Complete"}
                            </button>
                            <button onClick={() => this.handleDelete(task._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Tasks;
