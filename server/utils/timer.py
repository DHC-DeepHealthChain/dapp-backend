import threading
import requests
import time

def fun_timer():
    syncScore = requests.get('http://121.40.184.139:18010/api/schedules/syncScore')
    syncScoreLog = requests.get('http://121.40.184.139:18010/api/schedules/syncScoreLog')
    print type(syncScore)
    print type(syncScoreLog)
    print time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
    print syncScore.status_code
    print syncScore.encoding
    print syncScoreLog.status_code
    print syncScoreLog.encoding
    global timer
    timer = threading.Timer(3600, fun_timer)
    timer.start()

timer = threading.Timer(3600, fun_timer)
timer.start()
