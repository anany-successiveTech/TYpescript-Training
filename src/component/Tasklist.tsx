import "@/app/styles/tasklist.css";

const Tasklist = ({ tasks }: { tasks: string[] }) => {
  return (
    <div className="tasklist-container">
      <h1 className="tasklist-title">Task List</h1>
      <ul className="tasklist">
        {tasks.map((taskItem: string, index: number) => (
          <li key={index} className="tasklist-item">
            {taskItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasklist;
