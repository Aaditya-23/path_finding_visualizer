import "./Styles.css";

export default function Button({ props }) {
  const { title , bgcolor} = props;
  return <div style={{
    backgroundColor: bgcolor
  }} className="custom-button">{title}</div>;
}
