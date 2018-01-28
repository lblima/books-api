import supertest from 'supertest';
import chai from 'chai';
import joi from 'joi';
import joiAssert from 'joi-assert';
import app from '../../app';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.joi = joi;
global.joiAssert = joiAssert;