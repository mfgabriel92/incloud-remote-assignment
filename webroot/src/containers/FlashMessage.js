import FlashMessage from "../components/common/FlashMessage";
import { connect } from "react-redux";

const mapActionCreators = {
};

const mapStateToProps = state => ({
  flash: state.app.flashMessage
});

export default connect(mapStateToProps, mapActionCreators)(FlashMessage);