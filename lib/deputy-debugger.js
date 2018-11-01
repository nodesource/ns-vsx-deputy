/* eslint-disable */ module.exports = { deputyInvalidPromiseResolve, deputyInvalidPromiseReject, deputyRejectionUnhandled, deputyUnhandledException }

/*
 * The below functions are used by deputy to break via the debugger,
 * whenever a problem in your program is encountered that requires
 * inspection.
 * The values you should inspect are passed as arguments, i.e. (promise, err)
 *
 * Investigate current `[[PromiseStatus]]` by hovering over the promise argument
 * or in the 'Variables' section of the sidebar.
 *
 * Additionally find more error details inside the Debug Console including 
 * the highlighted origin of the problem as part of the call stack.
 * To troubleshoot it is advised to jump to that frame via the Call Stack of
 * the Debug window in the sidebar.
 * 
 * Consult the documentation to learn more:
 * https://nodejs.org/api/process.html#process_event_multipleresolves
 */

function deputyInvalidPromiseResolve(promise, resolvedValue) { debugger }

function deputyInvalidPromiseReject(promise, err) { debugger }

function deputyRejectionUnhandled(promise, err) { debugger }

function deputyUnhandledException(err) { debugger }
