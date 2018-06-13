import Home from "../../components/Home";
import { connect } from "react-redux";
import { fetchTasks, storeTask, updateTask } from "../../actions/tasks";

const mapActionCreators = {
  fetchTasks,
  storeTask,
  updateTask
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps, mapActionCreators)(Home);
