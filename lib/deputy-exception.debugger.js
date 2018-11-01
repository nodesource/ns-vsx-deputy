/* eslint-disable */ module.exports = { deputyUnhandledException }

/*
 * The below functions are used by deputy to break via the debugger,
 * whenever a problem in your program is encountered due to an exception that
 * requires inspection.
 * The values you should inspect are passed as arguments, i.e. (err)
 *
 * Find more error details inside the Debug Console including 
 * the highlighted origin of the problem as part of the stack of the exception.
 * To troubleshoot it is advised to tick 'Uncaught Exceptions' in the debugger
 * pane in the sidebar and rerun your process.
 *  
 * Consult the documentation to learn more:
 * https://nodejs.org/api/process.html#process_event_uncaughtexception
 * https://nodejs.org/api/process.html#process_process_setuncaughtexceptioncapturecallback_fn
 */

function deputyUnhandledException(err) { debugger }
