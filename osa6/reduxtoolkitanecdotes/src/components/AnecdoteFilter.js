import {useDispatch} from "react-redux";
import {setfilter} from "../reducers/FilterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    //wait(500);
    const filterText = e.target.value;
    //console.log(filterText);
    dispatch(setfilter(filterText));
  };

  const style = {
    marginBottom: '5px'
  };

  return (
    <div style={style}>
      Filter <input type="text" name="filter" onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;