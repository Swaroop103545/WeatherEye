module.exports = {
  EventEmitter: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
  })),
  requireNativeModule: jest.fn(),
  requireOptionalNativeModule: jest.fn(),
}; 