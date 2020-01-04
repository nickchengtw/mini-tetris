
const expect = chai.expect

describe("calculation module", function() {
    it("calcSpaceB(gridX, y)", function() {
        test_data = [
            {env: [ [5,9] ], data:[5, 280], target: 40},
            {env: [ [5,9] ], data:[5, 320], target: 0},
            {env: [ [4,9] ], data:[4, 318], target: 2},
            {env: [ [5,9], [5,8] ], data:[5, 280], target: 0},
            {env: [], data:[5, 360], target: 0}
        ]

        for (i in test_data) {
            let env = test_data[i].env
            let data = test_data[i].data
            let target = test_data[i].target

            grid = blankGrid()
            env.forEach(function (item, index) {
                writeGrid(item[0], item[1])
            });

            const result = calcSpaceB(data[0], data[1])
            expect(result).to.be.equal(target)
        }
    })
})
