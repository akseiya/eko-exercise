const { expect } = require('chai');
const { clog, graphRunner } = require('../index');

describe('Graph runner', () => {
    describe('when created with the sample spec', () => {
        let runner;

        beforeEach(() => {
            runner = new graphRunner('AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1');
        });

        it('stores an object with edges', () => {
            expect(runner.edges).to.be.an('object');
            expect(runner.edges).to.have.keys(['A', 'B', 'C', 'D', 'E', 'F']);
        });

        describe(`==== in Exercise - Case 1 ====`, () => {
            it('throws when passed an inexistent route', () => {
                expect(() => runner.followDirectRoute('A-D-F')).to.throw('No Such Route');
            });
            it('returns expected cost when following a correct route', () => {
                [
                    [ 'A-B-E',   4 ],
                    [ 'A-D',    10 ],
                    [ 'E-A-C-F', 8 ],
                ].forEach(input => {
                    const [route, expectedCost] = input;
                    expect(runner.followDirectRoute(route)).to.eql(expectedCost);
                })
            });
        });

        describe(`==== in Exercise - Case 2 ====`, () => {
            it('finds indirect routes', () => {
                
            });
        });
    })
});