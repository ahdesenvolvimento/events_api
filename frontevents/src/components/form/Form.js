import Card from "../layout/Card";
export default function Form({
  method,
  handleOnSubmit,
  content,
  backgroundColor,
  border
}) {
  return (
    <>
      <form action="" method={method} onSubmit={handleOnSubmit}>
        <Card content={content} backgroundColor={backgroundColor} border={border}/>
      </form>
    </>
  );
}
