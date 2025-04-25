type MessageProps = {
    text: string;
    visible: boolean;
  };
  
//Displays a message
//turns red, if message contains "error"
  export default function Message({ text, visible }: MessageProps) {
    if (!visible) return null;

    const isError = text.toLowerCase().includes("error");
  
    return (
      <div className={`message ${isError ? "error" : ""}`}>
        <p>{text}</p>
      </div>
    );
  }