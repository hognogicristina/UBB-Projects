cmake_minimum_required(VERSION 3.19)
project(a11_12_913_Hognogi_Cristina)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

set(CMAKE_PREFIX_PATH "C:\\Qt\\6.3.0\\mingw_64\\lib\\cmake")

find_package(Qt6 COMPONENTS
        Core
        Gui
        Widgets
        REQUIRED)

include_directories(Domain)
include_directories(GUI)
include_directories(Repository)
include_directories(Service)
include_directories(Start)
include_directories(Validator)

add_executable(a11_12_913_Hognogi_Cristina
        Domain/Domain.cpp
        Domain/Domain.h
        GUI/GUI.cpp
        GUI/GUI.h
        Repository/RepoAdmin.cpp
        Repository/RepoAdmin.h
        Repository/RepoUser.cpp
        Repository/RepoUser.h
        Repository/RepoUserCSV.cpp
        Repository/RepoUserCSV.h
        Repository/RepoUserHTML.cpp
        Repository/RepoUserHTML.h
        Service/ServiceAdmin.cpp
        Service/ServiceAdmin.h
        Service/ServiceUser.cpp
        Service/ServiceUser.h
        Start/Main.cpp
        Validator/Validator.cpp
        Validator/Validator.h)

target_link_libraries(a11_12_913_Hognogi_Cristina
        Qt::Core
        Qt::Gui
        Qt::Widgets
        )

if (WIN32)
    set(DEBUG_SUFFIX)
    set(QT_INSTALL_PATH "${CMAKE_PREFIX_PATH}")
    if (NOT EXISTS "${QT_INSTALL_PATH}/bin")
        set(QT_INSTALL_PATH "${QT_INSTALL_PATH}/..")
        if (NOT EXISTS "${QT_INSTALL_PATH}/bin")
            set(QT_INSTALL_PATH "${QT_INSTALL_PATH}/..")
        endif ()
    endif ()
    if (EXISTS "${QT_INSTALL_PATH}/plugins/platforms/qwindows${DEBUG_SUFFIX}.dll")
        add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
                COMMAND ${CMAKE_COMMAND} -E make_directory
                "$<TARGET_FILE_DIR:${PROJECT_NAME}>/plugins/platforms/")
        add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
                COMMAND ${CMAKE_COMMAND} -E copy
                "${QT_INSTALL_PATH}/plugins/platforms/qwindows${DEBUG_SUFFIX}.dll"
                "$<TARGET_FILE_DIR:${PROJECT_NAME}>/plugins/platforms/")
    endif ()
    foreach (QT_LIB Core Gui Widgets)
        add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
                COMMAND ${CMAKE_COMMAND} -E copy
                "${QT_INSTALL_PATH}/bin/Qt6${QT_LIB}${DEBUG_SUFFIX}.dll"
                "$<TARGET_FILE_DIR:${PROJECT_NAME}>")
    endforeach (QT_LIB)
endif ()