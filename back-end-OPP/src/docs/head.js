const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API do Observatório de Políticas Públicas",
            description: "API para controlar a lógica de negócio do site",
            version: "0.0.1",
            contact: {
                name: "developer",
                email: "observatorio@gmail.com",
            },
            license: {
                name: "MIT"
            },
        },
        servers: [
            {
                url: 'http://localhost:3010',
                description: "API de desenvolvimento no FSLAB",
            },
            {
                url: 'https://api.opp.fslab.dev',
                description: "API de produção no FSLAB",
            },
        ],
        tags: [
            {
                name: "Usuários",
                description: "Usuários do Observatório de Políticas Públicas",
                externalDocs: {
                    description: "Leia mais",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Publicações",
                description: "Publicações da plataforma",
                externalDocs: {
                    description: "Leia mais",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Parceiros",
                description: "Parcerios da plataforma",
                externalDocs: {
                    description: "Leia mais",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Login",
                description: "Rota de login"
            }],
        paths: {},
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                formacao: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            titulo: {
                                type: 'string'
                            },
                            curso: {
                                type: 'string'
                            }
                        }
                    }
                },
                usuario: {
                    type: 'object',
                    example: {
                        formacao: [{
                            titulo: "Graduação",
                            curso: "História"
                        }],
                        nome: "Carlos Eduardo",
                        email: "carloseduardo@gmail.com",
                        senha: "12345678",
                        ativo: true,
                        path_photo: "unknown.png",
                        rotas: [{
                            rota: "publicacoes",
                            verbo_get: true,
                            verbo_post: true,
                            verbo_put: true,
                            verbo_patch: true,
                            verbo_delete: true
                        },{
                            rota: "usuarios",
                            verbo_get: true,
                            verbo_post: true,
                            verbo_put: true,
                            verbo_patch: true,
                            verbo_delete: true
                        },{
                            rota: "parceiros",
                            verbo_get: true,
                            verbo_post: true,
                            verbo_put: true,
                            verbo_patch: true,
                            verbo_delete: true
                        }]
                    },
                    properties: {
                        id: {
                            type: 'string'
                        },
                        formacao: {
                            $ref: '#/components/schemas/formacao'
                        },
                        email: {
                            type: 'string'
                        },
                        senha: {
                            type: 'string'
                        },
                        nome: {
                            type: 'string'
                        },
                        ativo: {
                            type: 'boolean'
                        },
                        path_photo: {
                            type: 'string'
                        },
                        rotas: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    rota: {
                                        type: 'string'
                                    },
                                    verbo_get: {
                                        type: 'boolean'
                                    },
                                    verbo_put: {
                                        type: 'boolean'
                                    },
                                    verbo_patch: {
                                        type: 'boolean'
                                    },
                                    verbo_delete: {
                                        type: 'boolean'
                                    },
                                    verbo_post: {
                                        type: 'boolean'
                                    }
                                }
                            }
                        }
                    }
                },
                usuarios: {
                    type: 'array',

                    items: {
                        $ref: '#/components/schemas/usuario'
                    }
                },
                publicacao: {
                    type: 'object',
                    example: {
                        data: "25/09/2022",
                        titulo: "Normas de utilização de computadores",
                        registro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        tags: [
                            'ab',
                            'et'
                        ],
                        tipo: "Artigo",
                        usuarioId: "63856301774f0678e56ec2f3"
                    },
                    properties: {
                        id: {
                            type: 'string'
                        },
                        data: {
                            type: 'string'
                        },
                        titulo: {
                            type: 'string'
                        },
                        registro: {
                            type: 'string'
                        },
                        tags: {
                            type: 'array',

                            items: {
                                type: 'string'
                            }
                        },
                        tipo: {
                            type: 'string'
                        },
                        usuarioId: {
                            type: 'string'
                        },
                    }
                },
                publicacoes: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/publicacao'
                    }
                },
                parceiro: {
                    type: 'object',
                    example: {
                        nome: "UNIR",
                        ativo: true,
                        caminho_logo: "unknown.png"
                    },
                    properties: {
                        id: {
                            type: 'string'
                        },
                        nome: {

                            type: 'string'
                        },
                        ativo: {

                            type: 'boolean'
                        },
                        caminho_logo: {

                            type: 'string'
                        }
                    }
                },
                parceiros: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/parceiro'
                    }
                },
                login: {
                    type: 'object',
                    example: {
                        email: "carloseduardo@gmail.com",
                        senha: "12345678"
                    },
                    properties: {
                        email: {
                            type: 'string'
                        },
                        senha: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
}

export default swaggerOptions