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
        it('throws when told to follow an inexistent route', () => {
            expect(() => runner.followRoute('A-D-F')).to.throw('No Such Route');
        });
    })
});