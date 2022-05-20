import { Header, Button, Input } from "./Searchbar.styles";
import { useState } from "react";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    // console.log("this.state in form", query);
    onSubmit(query);

    reset();
  };
  const reset = () => {
    setQuery("");
  };
  const handleSetQuery = (e) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <Header>
      <form className="form" onSubmit={onSubmitForm}>
        <Input
          value={query}
          name="query"
          type="text"
          onChange={handleSetQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Button type="submit">
          <span>Search</span>
        </Button>
      </form>
    </Header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   static defaultProps = {
//    onSubmit:PropTypes.func.isRequired,
//   }
//   state = { query: "" };

//   handleSetQuery = (e) => {
//    const { name, value } = e.currentTarget;

//     this.setState({ [name]: value.toLowerCase() });
// }
// onSubmitForm=(e)=> {
//     e.preventDefault();
// console.log('this.state in form', this.state)
//     this.props.onSubmit(this.state.query);

//     this.reset();

//   }
//    reset = () => {
//     this.setState({query: '' });
//   };
//   render() {

//     return (
//       <Header>
//         <form className="form" onSubmit={this.onSubmitForm}>

//           <Input
//             value={this.state.query}
//             name="query"
//             type="text"
//             onChange={this.handleSetQuery}
//                   autoComplete="off"
//                   autoFocus
//             placeholder="Search images and photos"
//           />
//            <Button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </Button>
//         </form>
//       </Header>
//     );
//   }
// }

// export default Searchbar;
