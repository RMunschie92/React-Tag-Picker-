import React, { Component } from 'react';
import './TagPicker.css';

class TagPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFolder: 'Root Level',
      parent: null,
      folders: [],
      files: [],
      ancestors: []
    }
  }

  // Debugging logs
  postMessages() {
    console.log('this.state.currentFolder: ' + this.state.currentFolder);
    console.log('this.state.parent: ' + this.state.parent);
    console.log('my ancestors are: ' + this.state.ancestors);
    console.log('selected tags are: ' + this.props.selectedTags);
  }

  getTags(current) {
    // Get folders associated with current folder
    let allFolders = this.props.tags.filter( (tag) => tag.isFolder );
    let currentFolders = [];
    for (let i = 0; i < allFolders.length; i++) {
      if (allFolders[i].parent === current.toString()) {
        currentFolders.push(allFolders[i]);
      } else {
      }
    }
    // Get tags associated wiht current folder
    let allFiles = this.props.tags.filter( (tag) => !tag.isFolder );
    let currentFiles = [];
    for (let j = 0; j < allFiles.length; j++) {
      if (allFiles[j].parent === current.toString()) {
        currentFiles.push(allFiles[j]);
      }
    }
    this.setState({
      folders: currentFolders,
      files: currentFiles
    }, function () {
        this.postMessages();
    });
  }

  componentDidMount() {
    this.getTags(this.state.currentFolder);
  }

  handleBackClick() {
    if (this.state.parent !== null || this.state.parent !== undefined) {
      let ancestors = this.state.ancestors;
      const len = ancestors.length;
      const parent = ancestors[len - 1];
      const grandparent = ancestors[len - 2];
      ancestors.splice(ancestors.length - 1, 1);
      this.setState({
        currentFolder: parent,
        parent: grandparent,
        ancestors: ancestors
      }, function () {
          this.getTags(this.state.currentFolder);
      });
    }
  }

  handleFolderClick(folder) {
    const newParent = [this.state.currentFolder];
    this.setState({
      currentFolder: folder,
      parent: newParent,
      ancestors: this.state.ancestors.concat([newParent])
    }, function () {
        this.getTags(this.state.currentFolder)
    });
  }

  render() {
    return (
      <div className="TagPicker">
        <header>
          <h3 className="current-folder">{this.state.currentFolder}</h3>
        </header>
        <div className="picker-main">

            <button type="button" className={ !this.state.parent  ? 'hide-button' : 'show-button' } onClick={() => this.handleBackClick()}>
              <i className="fas fa-caret-left icon"></i>
              Back
            </button>


          <table className="table-container">
            <tbody className="folder-tag-table">
            {this.state.folders.map( (folder, index) =>
              <tr className="folder row" key={index} onClick={() => this.handleFolderClick(folder.name)}>
                <td className="folder-cell">
                  <i className="fas fa-folder icon"></i>
                  {folder.name}
                  <span><i className="fas fa-chevron-right"></i></span>
                </td>
              </tr>
            )}

            {this.state.files.map( (tag, index) =>
              <tr className="tag row" key={index} onClick={() => this.props.onTagSelectionChange(tag.name)}>
                <td>
                  <span className={this.props.selectedTags.includes(tag.name) ? '' : 'hide-button'}><i className="far fa-check-square"></i></span>
                  <span className={!this.props.selectedTags.includes(tag.name) ? '' : 'hide-button'}><i className="far fa-square icon"></i></span>
                  {tag.name}
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TagPicker;
