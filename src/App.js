import React, { Component } from 'react';
import data from './data/tags.js';
import TagPicker from './TagPicker.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      tags: data,
      selectedTags: [],
      currentTag: null
    }
  }

  setCurrentTag(file) {
    this.setState({
      currentTag: file
    });
  }

  onTagSelectionChange(file) {
    let selected = this.state.selectedTags;

    if (selected.includes(file)) {
      // Filter out unselected song
      let newSelected = selected.filter(ind => ind !== file)
      this.setState({
        selectedTags: newSelected
      }, function () {
        console.log(this.state.selectedTags);
      });
    }
    else {
        this.setState({
          selectedTags: this.state.selectedTags.concat([file])
        }, function () {
            console.log(this.state.selectedTags);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>React Tag Picker</h1>
        <TagPicker
          tags={this.state.tags}
          selectedTags={this.state.selectedTags}
          currentTag={this.state.currentTag}
          onTagSelectionChange={(file) => this.onTagSelectionChange(file)}
        />
      </div>
    );
  }
}

export default App;
