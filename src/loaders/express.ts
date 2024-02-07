import { Application } from "express";
import { middleware } from "../middleware";
import cors from 'cors';
import express from 'express';
import helmet from "helmet";
import { config } from "../config";
import appRouter from "../routes";

export const expressLoader = async (app: Application) => {

    app.get('/', (req, res) => {
        res.send('Hi there!');
    });
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    app.use(middleware.requestLogger);
    app.use(cors({origin:true}));
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(helmet());

      /*  Proxy rules */
  app.set('trust proxy', true);

  /*  Routes  */
  app.use(config.api.prefix, appRouter);

  /*  404 middleware  */
  app.use(middleware.notFound);

  /*  Error middleware  */
  app.use(middleware.errorRequest);
}