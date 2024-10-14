import { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native New",
    description:
      "As absolute is by amounted repeated entirely ye returned. These ready timed enjoy might sir yet one since.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // Adding Task initialy and After edit
  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setTaskToUpdate(null);
    setShowAddModal(false);
  }
  // Editing Function Logic
  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  // Modal Closing
  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }
  // Deleting a Task
  function handleDelete(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* Task Action */}
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {/* Task List */}
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}
