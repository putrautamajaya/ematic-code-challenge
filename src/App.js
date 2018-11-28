import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    event: [],
    eventSortedBySearch: [],
    eventDone: [],
    idCount: 0,
    sortName: 0,
    sortCreatedAt: 0
  };

  handleAdd = () => {
    let event = [...this.state.event];
    let idCount = this.state.idCount + 1;
    let date = new Date();
    let inputData = {
      id: idCount,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      createdAt: date
    };
    event.push(inputData);
    this.setState({ event, idCount });
    alert("Add success");
  };

  handleEdit = id => {
    let event = [...this.state.event];
    let selectedEvent = event.filter(data => data.id === id);
    let index = event.indexOf(selectedEvent[0]);
    event[index].title = document.getElementById(`editTitle${id}`).value;
    event[index].description = document.getElementById(
      `editDescription${id}`
    ).value;
    this.setState({ event });
    alert("Edit success");
  };

  handleDelete = id => {
    let event = [...this.state.event];
    let selectedEvent = event.filter(data => data.id === id);
    let index = event.indexOf(selectedEvent[0]);
    event.splice(index, 1);
    this.setState({ event });
    alert("Delete success");
  };

  sortByName = () => {
    const { sortName } = this.state;
    let event = [...this.state.event];
    if (!sortName) {
      event = event.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      this.setState({ sortName: 1 });
    } else {
      event = event.sort((a, b) =>
        a.title < b.title ? 1 : b.title < a.title ? -1 : 0
      );
      this.setState({ sortName: 0 });
    }
    this.setState({ event });
  };

  sortByCreatedAt = () => {
    const { sortCreatedAt } = this.state;
    let event = [...this.state.event];
    if (!sortCreatedAt) {
      event = event.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      this.setState({ sortCreatedAt: 1 });
    } else {
      event = event.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      this.setState({ sortCreatedAt: 0 });
    }
    this.setState({ event });
  };

  search = () => {
    let search = document.getElementById("inputSearch").value;
    let event = [...this.state.event];
    let eventSortedBySearch = [];
    event.map(item => {
      if (item.title.includes(search) && search !== "") {
        eventSortedBySearch.push(item);
      }
      return eventSortedBySearch;
    });
    this.setState({ eventSortedBySearch });
  };

  handleDone = (id, checked) => {
    console.log("masuk", id);
    let event = [...this.state.event];
    let eventDone = [...this.state.eventDone];
    if (!checked) {
      let selectedEvent = event.filter(data => data.id === id);
      let index = event.indexOf(selectedEvent[0]);
      eventDone.push(event[index]);
      event.splice(index, 1);
      this.setState({ event, eventDone });
    } else {
      let selectedEvent = eventDone.filter(data => data.id === id);
      let index = eventDone.indexOf(selectedEvent[0]);
      event.push(eventDone[index]);
      eventDone.splice(index, 1);
      this.setState({ event, eventDone });
    }
  };

  showDetail = id => {
    const { classList } = document.getElementById(id);
    classList.contains("display-none")
      ? classList.remove("display-none")
      : classList.add("display-none");
  };

  renderList = (data, showDetail, handleEdit, handleDelete, checked) => {
    return (
      <div key={data.id} style={{ width: 600 }}>
        <div className="title" onClick={() => showDetail(data.id)}>
          <input
            type="checkbox"
            className="check-box"
            defaultChecked={checked}
            onClick={() => this.handleDone(data.id, checked)}
          />
          <div>
            <p>Title: {data.title}</p>
            <p style={{ color: "grey" }}>
              Created At: {data.createdAt.toString()}
            </p>
          </div>
        </div>

        <div id={data.id} className="display-none content">
          <input
            id={`editTitle${data.id}`}
            type="text"
            spellCheck="false"
            placeholder="Title"
            defaultValue={data.title}
          />
          <textarea
            id={`editDescription${data.id}`}
            rows="4"
            spellCheck="false"
            placeholder="Description"
            defaultValue={data.description}
          />
          <p style={{ color: "white", padding: "10px 0 0 0" }}>
            Event Created at:{" "}
          </p>
          <p style={{ color: "white", padding: "0 10px 0 0" }}>
            {data.createdAt.toString()}
          </p>
          <div>
            <button type="submit" onClick={() => handleEdit(data.id)}>
              Edit
            </button>
            <button type="submit" onClick={() => handleDelete(data.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    console.log("render");
    console.log(this.state.event);
    console.log(this.state.eventDone);
    const { event, eventSortedBySearch, eventDone } = this.state;
    let eventList;
    eventSortedBySearch.length === 0
      ? (eventList = event)
      : (eventList = eventSortedBySearch);
    const {
      handleAdd,
      showDetail,
      handleEdit,
      handleDelete,
      sortByName,
      sortByCreatedAt,
      search
    } = this;

    return (
      <div className="container">
        <h1>To Do List :</h1>
        <h4>Search :</h4>
        <input
          id="inputSearch"
          type="text"
          spellCheck="false"
          style={{ width: "600px" }}
          onKeyUp={search}
        />
        <h4>Title :</h4>
        <input
          id="title"
          type="text"
          spellCheck="false"
          style={{ width: "600px" }}
        />
        <h4>Description :</h4>
        <input
          id="description"
          type="text"
          spellCheck="false"
          style={{ width: "600px" }}
        />
        <br />
        <button type="submit" onClick={handleAdd}>
          Add
        </button>
        <button type="submit" onClick={sortByName}>
          Sort By Name
        </button>
        <button type="submit" onClick={sortByCreatedAt}>
          Sort By Created At
        </button>

        <p style={{ padding: "20px 0 10px 0" }}>To do: {event.length}</p>
        {eventList.map(data =>
          this.renderList(data, showDetail, handleEdit, handleDelete, false)
        )}

        <p style={{ padding: "20px 0 10px 0" }}>Done: {eventDone.length}</p>
        {eventDone.map(data =>
          this.renderList(data, showDetail, handleEdit, handleDelete, true)
        )}
      </div>
    );
  }
}

export default App;
