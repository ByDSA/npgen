<% const { author, name, description } = JSON.parse(include("../package.json"));
  const authorEmail = author?.email;
  const authorNPMUsername = author?.npmjs;
  const authorGithubUsername = author?.github;
-%>
# <%= name %>
[![NPM version](http://img.shields.io/npm/v/<%= name %>.svg)](https://www.npmjs.com/package/<%= name %>)
[![Generic badge](https://img.shields.io/badge/GitHub-<%= name.replace("-", "--") %>-blue.svg?logo=github)](https://github.com/<%= authorGithubUsername %>/<%= name %>)
[![CI](https://github.com/<%= authorGithubUsername %>/<%= name %>/actions/workflows/ci.yml/badge.svg)](https://github.com/<%= authorGithubUsername %>/<%= name %>/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/<%= authorGithubUsername %>/<%= name %>/branch/main/graph/badge.svg?token=RIJ2K00E5J)](https://codecov.io/gh/<%= authorGithubUsername %>/<%= name %>)

## Overview
<% if (description) { -%>
> <%= description %>
<% } -%>

<%- include("overview.md") %>
<% if (authorGithubUsername) { -%>

Read [docs](https://github.com/<%= authorGithubUsername %>/<%= name %>/wiki).
<% } -%>

## Install
npm:
```sh
npm install <%= name %>
```
Yarn:

```sh
yarn add <%= name %>
```
## Usage
<%- include("usage.md") %>
<% if (authorName || authorTwitterUsername || authorGithubUsername) { -%>
## Author
<% if (authorName) { %>
👤 **<%= authorName %>**
<% } %>
<% if (authorWebsite) { -%>
* Website: <%= authorWebsite %>
<% } -%>
<% if (authorEmail) { -%>
* Email: <%= authorEmail %>
<% } -%>
<% if (authorTwitterUsername) { -%>
* Twitter: [@<%= authorTwitterUsername %>](https://twitter.com/<%= authorTwitterUsername %>)
<% } -%>
<% if (authorGithubUsername) { -%>
* GitHub: [@<%= authorGithubUsername %>](https://github.com/<%= authorGithubUsername %>)
<% } -%>
<% if (authorNPMUsername) { -%>
* NPM: [@<%= authorNPMUsername %>](https://www.npmjs.com/~<%= authorNPMUsername %>)
<% } -%>
<% if (authorLinkedInUsername) { -%>
* LinkedIn: [@<%= authorLinkedInUsername %>](https://linkedin.com/in/<%= authorLinkedInUsername %>)
<% } -%>
<% } -%>
<% if (licenseName && licenseUrl) { -%>
---
<% if (authorName && authorGithubUsername) { -%>
Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>)<%= authorEmail ? ` \<${authorEmail}\>` : "" %>.<br />
<% } -%>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

