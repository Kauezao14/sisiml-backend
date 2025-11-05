'use strict';

/**
 * @author Felipe
 */
const express = require('express');
const passport = require("passport");
const bodyParser = require('body-parser');
const anuncioRoute = require('./src/routes/anuncio.route');
const mercadoLivreRoute = require('./src/routes/mercadoLivre.route');
const app = express();
const cors = require('cors');
const usuarioRoute = require('./src/routes/usuario.route');
const session = require('express-session');
const flash = require('connect-flash');
const saldoRoute = require('./src/routes/saldo.route')
const vendasRoute = require('./src/routes/vendas.router')
const clienteRoute = require('./src/routes/cliente.route')
const bloqueioRoute = require('./src/routes/bloqueio.route')
const rastreioRoute = require('./src/routes/rastreio.route')
const filaPerguntasRoute = require("./src/routes/filaPerguntas.route")
const comunicadoVendedorRoute = require("./src/routes/comunicadoVendedor.route")
const atualizadorRefreshToken = require("./src/services/agendadorRefreshToken/atualizadorRefreshToken")
const atividadeDiariaRoute = require('./src/routes/atividadeDiaria.route')
const mensagemPosVenda = require("./src/routes/msgPosVenda.route")
const forgotPassword = require("./src/routes/forgotpassword.route")
const concorrenteRoute = require('./src/routes/concorrente.route')

/* ✅ ROTA DE TESTE PÚBLICA — IMPORTANTE VIR AQUI */
app.get("/", (req, res) => {
  res.send("API online ✅ - Railway OK");
});

//  Adicionar e configurar middleware
app.use(session({
    secret: 'sessionSecretKey',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Ajuste de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});

/* ✅ ALTERAÇÃO IMPORTANTE AQUI ↓↓↓ */
app.use('/mercadolivre', mercadoLivreRoute);

/* 🔥 Rotas normais */
app.use('/anuncio', anuncioRoute);
app.use('/usuario', usuarioRoute);
app.use('/saldo', saldoRoute);
app.use('/vendas', vendasRoute);
app.use('/clientes', clienteRoute);
app.use('/rastreio', rastreioRoute);
app.use('/bloqueio', bloqueioRoute);
app.use('/perguntas', filaPerguntasRoute);
app.use('/comunicado', comunicadoVendedorRoute);
app.use('/atualizador_refresh_token', atualizadorRefreshToken);
app.use('/atividade', atividadeDiariaRoute);
app.use("/msg_pos_venda", mensagemPosVenda);
app.use("/forgot_password", forgotPassword);
app.use('/concorrente', concorrenteRoute);

module.exports = app;
