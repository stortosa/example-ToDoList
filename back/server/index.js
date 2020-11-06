const http = require('http');
const app = require('./app');
const express = require('express');

const port = process.env.PORT || 4000;   // or 3000

const host = process.env.HOST || '0.0.0.0'

const server = http.createServer(app);

server.listen(port, host, ()=>{
  console.log("It´s working...................")
});