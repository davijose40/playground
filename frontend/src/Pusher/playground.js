/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/no-string-refs */
// client/src/App.js

import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class Playground extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      html: '',
      css: '',
      js: '',
    };

    this.pusher = new Pusher('e2ca18c19bf9c4546f15', {
      cluster: 'mt1',
      forceTLS: true,
    });

    this.channel = this.pusher.subscribe('editor');
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });

    this.channel.bind('code-update', (data) => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js,
      });
    });
  }

  componentDidUpdate() {
    this.runCode();
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios.post('http://localhost:5000/update-editor', data).catch(console.error);
  };

  runCode = () => {
    const { html, css, js } = this.state;

    const { iframe } = this.refs; // eslint-disable-line
    const document = iframe.contentDocument;
    const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };

    return (
      <div className="play">
        <section className="playground" style={{ marginTop: '70px' }}>
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, html) => {
                // eslint-disable-line
                // eslint-disable-line
                this.setState({ html }, () => this.syncUpdates());
              }}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => {
                // eslint-disable-line
                // eslint-disable-line
                this.setState({ css }, () => this.syncUpdates());
              }}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <CodeMirror
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                // eslint-disable-line
                // eslint-disable-line
                this.setState({ js }, () => this.syncUpdates());
              }}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" style={{ marginTop: '70px' }} />
        </section>
      </div>
    );
  }
}

export default Playground;
