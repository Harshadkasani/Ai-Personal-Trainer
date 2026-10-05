export default function Loader({ text }) {
  return <div className="overlay"><div className="spinner" /><p>{text}</p></div>;
}
