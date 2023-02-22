const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal '0' when input is not valid object", () => {
    const invalidValues = [0, 55, NaN, [], {}, "", null, () => {}];
    invalidValues.forEach((invalidValue) => {
      const trivialKey = deterministicPartitionKey(invalidValue);
      expect(trivialKey).toBe("0");
    });
  });
  it("Returns the corresponding partitionKey for valid input", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "1564" });
    expect(trivialKey).toBe(
      "5b033cd2c247b00fcf29ada584769bcb99991525c34d908fb872f3c7d279ae6dcca0b7f0d7a368caa1daeba14d7fc5a0f30893e92e8beb8884e859d868446fb8"
    );
  });
  it("Returns the corresponding partitionKey for input without partitionKey", () => {
    const trivialKey = deterministicPartitionKey({
      user: "1564",
      id: "15saf16sd5f",
      name: "lkajsdflkassd",
      lastName: "laskjdfalsdkjf",
      country: "Brazil",
      phoneNumber: "5554444666",
      email: "lskdjflsdkjf@alsdkfjasdf.com",
    });
    expect(trivialKey).toBe(
      "9e8eb0daa61640a1267a9084fe2a0a4e2ff3b08367126691d0b1fa9a571ed180a7f045053d91146ed973df82e854bb0e0d9461fc3dd304f915dc0ba2dc8bb62a"
    );
  });
});
