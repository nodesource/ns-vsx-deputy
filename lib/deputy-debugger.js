/* eslint-disable */ module.exports = { deputyMultiResolve, deputyRejectAfterResolve }


/*
 * The below functions are used by deputy to break via the debugger
 * whenever a problem in your program is encountered, that requires
 * inspection.
 * The values you should inspect are passed as arguments, i.e. (promise, err)
 *
 * Additionally find more error details inside the Debug Console including 
 * the highlighted origin of the problem as part of the call stack.
 * To trouble shoot it is advised to jump to that frame via the Call Stack of
 * the Debug window in the sidebar.
 */

function deputyMultiResolve(promise, resolvedValue) { debugger }

function deputyRejectAfterResolve(promise, err) { debugger }
