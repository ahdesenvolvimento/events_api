export default function Form({
  method,
  handleOnSubmit,
  content
}) {
  return (
    <>
        <form action="" method={method} onSubmit={handleOnSubmit}>
            {content}
        </form>
    </>
  );
}
