const userValidation = async (req, res, verbo, model, callback) => {
    const userID = req.user_id

    const resultUserId = await model.findById(userID)

    if (!resultUserId) {
        return res.status(401).json({ mensagem: "usuário nao existe" })
    }

    if (resultUserId.ativo == false) {
        return res.status(401).json({ mensagem: "Usuário não está ativo" })
    }

    console.log(resultUserId)
    const verifyingVerb = resultUserId.rotas.map((item, index) => {
        switch (verbo) {
            case 'GET':
                if (item.verbo_get == true) {
                    return true;
                } else {
                    return false;
                }
            case 'POST':
                if (item.verbo_post == true) {
                    return true;
                } else {
                    return false;
                }
            case 'PATCH':
                if (item.verbo_patch == true) {
                    return true;
                } else {
                    return false;
                }
            case 'PUT':
                if (item.verbo_put == true) {
                    return true;
                } else {
                    return false;
                }
            case 'DELETE':
                if (item.verbo_delete == true) {
                    return true;
                } else {
                    return false;
                }
        }
    })
    console.log("AQUII", verifyingVerb)
    if (verifyingVerb[0] == false) {
        return res.status(401).json({ mensagem: "usuário sem permissão" })
    }

    return await callback()
}

export default userValidation