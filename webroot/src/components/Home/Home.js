import React, {Component} from "react";
import Time from "./Time";
import moment from "moment";
import Table from "react-table";
import Cleave from "cleave.js/react";
import "react-table/react-table.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: null,
      newDuration: "",
      isLoading: false
    }
  }

  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  componentWillReceiveProps(nextProps) {
    const {
      fetchTasks,
      tasks: {
        fetchingTasks,
        fetchingTasksSuccess,
        tasks,
        storingTasks,
        storingTasksSuccess,
        updatingTasks,
        updatingTasksSuccess
      }
    } = nextProps;

    if (fetchingTasks && !fetchingTasksSuccess) {
      this.setState({ isLoading: true })
    }

    if (fetchingTasksSuccess && tasks) {
      this.setState({ tasks, isLoading: false });
    }

    if ((!storingTasks && storingTasksSuccess) || (!updatingTasks && updatingTasksSuccess))   {
      fetchTasks();
      this.setState({ newDuration: "" });
    }
  }

  onBlur = id => {
    const { updateTask } = this.props;
    const { newDuration } = this.state;

    newDuration !== "" && updateTask(id, { duration: newDuration });
  };

  renderEditable = (cell) => {
    const id = this.state.tasks[cell.index].id;
    const value = this.state.tasks[cell.index][cell.column.id];

    return (
      <div
        contentEditable
        suppressContentEditableWarning
        className="editable-input form-control"
        onInput={e => this.setState({ newDuration: e.target.innerHTML })}
        onBlur={() => this.onBlur(id)}
        dangerouslySetInnerHTML={{
          __html: value
        }}
      />
    );
  };

  renderTasksList = () => {
    const { tasks, isLoading } = this.state;

    const data = [];

    tasks && tasks.map((t) => {
      data.push({
        _id: t.id,
        description: t.description,
        duration: t.duration,
        concludedAt: moment(t.concludedAt).format("MMMM Do YYYY, h:mm:ss a")
      })
    });

    const columns = [{
      Header: "Description",
      accessor: "description"
    }, {
      Header: "Duration",
      Cell: this.renderEditable,
      accessor: "duration",
    }, {
      Header: "Concluded at",
      accessor: "concludedAt"
    }];

    return (
      <Table
        data={data}
        columns={columns}
        loading={isLoading}
        filterable={true}
        defaultPageSize={10}
        noDataText={"No tasks created"}
      />
    )
  };

  render() {
    const { storeTask } = this.props;

    return (
      <div id="home" className="container">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="tracker">
                <Time storeTask={storeTask}/>
              </div>
            </div>
          </div>
          <div className="list">
            {this.renderTasksList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home;