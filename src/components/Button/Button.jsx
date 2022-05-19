import PropTypes from 'prop-types';
import {Button} from './Button.styles'

export const ButtonLoadMore = ({ handleLoadMore }) => {
  return (
    <Button type="submit" onClick={handleLoadMore}>
      Load more
    </Button>
  );
};

ButtonLoadMore.propTypes = {
    handleLoadMore:PropTypes.func.isRequired
}
