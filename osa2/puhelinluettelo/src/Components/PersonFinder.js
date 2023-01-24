import Input from "./Input";

const PersonFinder = ({stringchanged, string}) => {
  return (
    <>
      <b>Find person{'(s)'}:</b> <Input onchange={stringchanged} name={'string'} value={string} />
    </>
  );
}

export default PersonFinder;