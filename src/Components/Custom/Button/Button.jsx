import "./Styles.css";

export default function Button({ props }) {
  const { title, styles } = props;
  return (
    <div style={styles} className="custom-button">
      {title}
    </div>
  );
}
