

describe('POST /characters', function () {

    it('Deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff ',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff ',
            alias: 'Mercurio',
            team: ['Vingadores do oeste', 'Irmandade de mutantes'],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('não deve cadastrar duplicado', function () {

            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    context('valida campos obrigatórios', function () {

        it('Campo name é obrigatório', function () {
            const character = {
                alias: 'Mercurio',
                team: ['Vingadores do oeste', 'Irmandade de mutantes'],
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"name\" is required')
                })
        })

        it('Campo alias é obrigatório', function () {
            const character = {
                name: 'Pietro Xavier',
                team: ['Vingadores do oeste', 'Irmandade de mutantes'],
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"alias\" is required')
                })
        })

        it('Campo team é obrigatório', function () {
            const character = {
                name: 'Pietro Xavier',
                alias: 'Mercurio',
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"team\" is required')
                })
        })

        it('Campo active é obrigatório', function () {
            const character = {
                name: 'Pietro Xavier',
                alias: 'Mercurio',
                team: ['Vingadores do oeste', 'Irmandade de mutantes']
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"active\" is required')
                })
        })
    })
})

