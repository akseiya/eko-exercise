const { expect } = require('chai');
const { graphRunner } = require('../index');

describe('Graph runner', () => {
    let modes = {'using unique nodes': true, 'using unique steps': false};
    for(uniqueness in modes) 
        describe(`when created with the sample spec ${uniqueness}`, () => {
            let runner = new graphRunner(
                'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1',
                modes[uniqueness]
            );

            it('stores an object with edges', () => {
                expect(runner.edges).to.be.an('object');
                expect(runner.edges).to.have.keys(['A', 'B', 'C', 'D', 'E', 'F']);
            });

            describe(`==== in Exercise - Case 1 ====`, () => {
                it('throws when passed inexistent route A-D-F', () => {
                    expect(
                        () => runner.followDirectRoute('A-D-F')
                    ).to.throw();
                });

                [
                    [ 'A-B-E',   4 ],
                    [ 'A-D',    10 ],
                    [ 'E-A-C-F', 8 ],
                ].forEach(testCase => {
                    const [route, expectedCost] = testCase;
                    it(`returns cost of ${expectedCost} for route ${route}`, () => {
                        expect(
                            runner.followDirectRoute(route)
                        ).to.eql(expectedCost);
                    });
                })
            });

            describe(`==== in Exercise - Case 2 ====`, () => {
                if(modes[uniqueness]) {
                    it('finds 5 indirect routes E -> E', () => {
                        expect(
                            runner.getIndirectRoutes('E','E').length
                        ).to.eql(5);
                    });
                } else {
                    it('finds 4 E -> D routes with 4 stops max', () => {
                        expect(
                            runner.getIndirectRoutes('E','D', 4).length
                        ).to.eql(4)
                    })
                }
            });

            describe('==== in Exercise - Case 3 ====', () => {
                [
                    ['E-D', 9],
                    ['E-E', 6],
                ].forEach(testCase => {
                    const [fromTo, expectedMinCost] = testCase;
                    it(`finds min. cost on ${fromTo} route as ${expectedMinCost}`,
                        () => {
                            expect(
                                runner.findCheapestRoute(fromTo)
                            ).to.eql(expectedMinCost);
                        }
                    );
                })
            });
        })
});
