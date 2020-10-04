class Declare {
  constructor(executionFunction) {
    this.promiseChain = [];
    this.handleError = () => {};
    this.hadResolved = false;
    this.value;

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    try {
      executionFunction(this.onResolve, this.onReject);
    } catch (error) {
      this.onReject(error);
    }
  }

  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    if(this.hadResolved) {
      this.onResolve(this.value);
    }
    return this;
  }

  catch(handleError) {
    this.handleError = () => handleError;
    this.onReject();
    return this;
  }

  onResolve(value) {
    if(!this.hadResolved) {
      this.hadResolved = true;
      this.value = value;
    }

    let storedValue = value;
    
    try {
      this.promiseChain.forEach((nextFunction) => {
         storedValue = nextFunction(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);

    if(!this.hadResolved) {
      this.hadResolved = true;
    }
  }
}
module.exports = Declare;