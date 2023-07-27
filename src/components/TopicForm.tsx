import { useState } from "react";

interface TopicFormProps {
  onSubmit: (title: string, description: string, questions: string) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState("");
  const onEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, description, questions);
  };
  return (
    <form onSubmit={onEvent}>
      <div>
        <label>
          Title:
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Description:
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Questions:
          <br />
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TopicForm;
