import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Label, Search, Grid, Header } from 'semantic-ui-react';

let source = [
  /* ***********************************************************
  This is an example of the fields that can be displayed in the search
  dropdown, other fields can be stored on source entries, but they
  will not appear in the search dropdown
  *********************************************************** */
  // {
  //     "title": "Legros and Sons",
  //     "description": "Business-focused homogeneous local area network",
  //     "image": "https://s3.amazonaws.com/uifaces/faces/twitter/commadelimited/128.jpg",
  //     "price": "$5.91"
  //   },
];

// const source = [
//   {
//     "title": "Legros and Sons",
//     "description": "Business-focused homogeneous local area network",
//     // "image": "https://s3.amazonaws.com/uifaces/faces/twitter/commadelimited/128.jpg",
//     // "price": "$5.91"
//   },
//   {
//     "title": "Runolfsson, Huel and Schuster",
//     "description": "Horizontal real-time encoding",
//     // "image": "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
//     // "price": "$54.62"
//   },
//   {
//     "title": "McLaughlin LLC",
//     "description": "Diverse neutral process improvement",
//     // "image": "https://s3.amazonaws.com/uifaces/faces/twitter/cdavis565/128.jpg",
//     // "price": "$23.12"
//   },
//   {
//     "title": "Gutmann, Sipes and Howe",
//     "description": "Configurable 5th generation conglomeration",
//     // "image": "https://s3.amazonaws.com/uifaces/faces/twitter/supervova/128.jpg",
//     // "price": "$98.80"
//   },
//   {
//     "title": "Senger Inc",
//     "description": "Self-enabling responsive challenge",
//     // "image": "https://s3.amazonaws.com/uifaces/faces/twitter/salleedesign/128.jpg",
//     // "price": "$87.31"
//   }
// ]

export default class SearchExampleStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);
  }
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {this.setState({ isLoading: false, results: [], value: '' })}

  handleResultSelect(e, { result }) {this.setState({ value: result.title })}

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  handleFollowClick(e, { result }) {
    console.log('BUTTON CLICKED: ', result);
  }

  resultRenderer({ title, spotifyId }) { // eslint-disable-line
    return (
      <div>
        <Label content={title} />
        <Button result={spotifyId} onClick={this.handleFollowClick}>Follow</Button>
      </div>
    );
  }

  render() {
    const { isLoading, value, results } = this.state;
    console.log('RENDERING SEARCH');
    if (this.props.options !== '' && JSON.stringify(this.props.options) !== JSON.stringify(source)) {
      // this.props.options contains all users and is being passed down from Homepage
      source = this.props.options;
      console.log('OPTIONS from Search.props.options ', this.props.options, 'source gloabal: ', source);
    }


    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            resultRenderer={this.resultRenderer}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Header>Options</Header>
          <pre>{JSON.stringify(source, null, 2)}</pre>
        </Grid.Column>
      </Grid>
    )
  }
}
