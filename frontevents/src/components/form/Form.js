import Card from "../layout/Card";
export default function Form({
  method,
  handleOnSubmit,
  content,
  backgroundColor,
  border,
  styles
}) {
  return (
    <>
      <form action="" className={styles ? styles.form : ''} method={method} onSubmit={handleOnSubmit}>
        <Card content={content} backgroundColor={backgroundColor} border={border}/>
      </form>
    </>
  );
}
